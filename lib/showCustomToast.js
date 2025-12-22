import CustomToast from "@/app/components/ui/toast/CustomToast";
import toast from "react-hot-toast";

export const showCustomToast = ({
  title = "Success",
  message = "Action completed successfully.",
  type = "success",
}) => {
  toast.custom((t) => (
    <CustomToast t={t} title={title} message={message} type={type} />
  ));
};
