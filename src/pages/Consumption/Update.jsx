import { Skeleton } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import CreateConsumptionStep2 from "./components/CreateConsumptionStep2";
import { useGetConsumptionByIdQuery } from "../../redux/slices/consumption";
import { PATH } from "../../../config";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: consumption = {}, isLoading: isConsumptionLoading } =
  useGetConsumptionByIdQuery(id);
  return isConsumptionLoading ? (
    <Skeleton active />
  ) : (
    <CreateConsumptionStep2
      updateMode={true}
      selectedItems={consumption?.itemsConsumption || []}
      isListLoading={isConsumptionLoading}
      remarks={consumption?.remarks}
      setStep={() => navigate(PATH.CONSUMPTION_LIST)}
    />
  );
};

export default Update;
