import { Button, Grid, Container } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ModalElement from "../../../components/elements/modal/ModalElement";
import VehicleForm from "../../../components/forms/vehicle/VehicleForm";
import HorizontalCardElement from "../../../components/elements/card/HorizontalCardElement";
import { useEffect, useState } from "react";
import * as database from "../../../database";
import { useDispatch, useSelector } from "react-redux";
import { setDeals } from "../../../redux/slices/dealsSlice";
import {
  FireStoreConst,
  AppNumberConst,
  AppTextConst,
} from "../../../constants/AppConstants";
import SpinnerLoader from "../../../components/spinner-loader/SpinnerLoaderComponent";
import { useNavigate } from "react-router-dom";
import FilterBarElement from "../../../components/elements/filter-bar/FilterBarElement";

const InventoryPage = () => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [forEditData, setForEditData] = useState([]); //retrieve data for edit func

  const handleModalOpen = (modalName) => {
    setModalType(modalName);
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deals = useSelector((state) => state.deals);
  const [loading, setLoading] = useState(true);
  const [make, setMake] = useState("All");
  const [filters, setFilters] = useState(make);
  const [financeMode, setFinanceMode] = useState(true);
  const [terms, setTerms] = useState(60);
  const [frequency, setFrequency] = useState("Monthly");

  const handleViewDetail = (id) => {
    navigate("view/" + id);
  };
  const handleChangeFinanceMode = () => {
    setFinanceMode(!financeMode);
  };
  const handleFilter = (selected) => {
    setLoading(true);
    setMake(selected);
    let data = [];
    const timer = setTimeout(() => {
      (async () => {
        const res = await database.load(FireStoreConst.INVENTORY_VEHICLES);
        if (selected !== "All") {
          res.filter((deal) => deal.make === selected && data.push(deal));
        } else {
          data = res;
        }
        dispatch(setDeals(data));
        setLoading(false);
      })();
    }, AppNumberConst.TIMEOUT_SEC);
    return () => clearTimeout(timer);
  };
  const handlePaymentChange = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      (async () => {
        const data = await database.load(FireStoreConst.INVENTORY_VEHICLES);
        setLoading(false);
        dispatch(setDeals(data));
        setFilters(data.filter((deal) => deal.make));
      })();
    }, AppNumberConst.TIMEOUT_SEC);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      (async () => {
        const data = await database.load(FireStoreConst.INVENTORY_VEHICLES);
        setLoading(false);
        dispatch(setDeals(data));
        setFilters(data.filter((deal) => deal.make));
      })();
    }, AppNumberConst.TIMEOUT_SEC);
    return () => clearTimeout(timer);
  }, [dispatch]);

  //delete data in  firestore
  const onRemoveVehicle = async (id) => {
    try {
      await database.remove(FireStoreConst.INVENTORY_VEHICLES, id);
    } catch (e) {
      console.log(e);
    }
  };

  const onRetrieveClick = async (id) => {
    try {
      deals.map((data) => {
        if (data.id === id) {
          setForEditData(data);
        }
      });

      console.log(forEditData);
    } catch (e) {}
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{
          pb: 1,
          ml: 5,
          mr: 3,
          mb: 3,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottom: 1,
          borderColor: "#e3e3e3",
        }}
      >
        <Grid item xs={6} sm={8} md={9} lg={10}>
          <div
            style={{ paddingLeft: 25, fontWeight: 700, verticalAlign: "top" }}
          >
            <span>Vehicle Inventory</span>
          </div>
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <Button
            variant="contained"
            disableElevation
            color="warning"
            onClick={(e) => {
              handleModalOpen(e.target.value);
            }}
            value={AppTextConst.ADDMODALTITLE}
          >
            <AddBoxOutlinedIcon />
            &nbsp;{"Add Inventory"}
          </Button>
        </Grid>
      </Grid>

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Grid
          container
          spacing={{ xs: 1, md: 1 }}
          sx={{
            mb: 3,
            p: 3,
            borderRadius: 1,
            backgroundColor: "#f5f4f4",
            border: 1,
            borderColor: "#e3e3e3",
          }}
        >
          <FilterBarElement
            deals={deals}
            filters={filters}
            make={make}
            terms={terms}
            frequency={frequency}
            setFrequency={setFrequency}
            setMake={setMake}
            setTerms={setTerms}
            financeMode={financeMode}
            handleFilter={handleFilter}
            handlePaymentChange={handlePaymentChange}
            handleChangeFinanceMode={handleChangeFinanceMode}
            isAdmin={true}
          />
        </Grid>
        {!loading && (
          <>
            <Grid container spacing={{ xs: 1, md: 1 }}>
              {deals &&
                Array.from(deals).map((deal, index) => (
                  <Grid item sm={12} md={6} key={index} sx={{ p: 3 }}>
                    <HorizontalCardElement
                      handleViewDetail={handleViewDetail}
                      financeMode={financeMode}
                      terms={terms}
                      frequency={frequency}
                      onRemoveVehicle={onRemoveVehicle}
                      handleModalOpen={handleModalOpen}
                      onRetrieveClick={onRetrieveClick}
                      modalTitleName={AppTextConst.EDITMODALTITLE}
                      data={deal}
                    />
                  </Grid>
                ))}
            </Grid>
          </>
        )}
        {loading && <SpinnerLoader size={55} loading={loading} />}
      </Container>
      {open && (
        <ModalElement
          title={modalType}
          isOpen={open}
          handleCloseModal={handleModalClose}
          element={
            <VehicleForm
              handleCloseModal={handleModalClose}
              modalType={modalType}
              forEditData={forEditData}
            />
          }
        />
      )}
    </>
  );
};
export default InventoryPage;
