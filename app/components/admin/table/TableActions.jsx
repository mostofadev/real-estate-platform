import { FaEye, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import IconButton from "./IconButton";

export default function TableActions({
  onView,
  onEdit,
  onDelete,
  onUpdateStatus,
  currentStatus,
}) {
  return (
    <div className="flex gap-2">
      {onUpdateStatus && currentStatus === "pending" && (
        <>
          <IconButton
            onClick={() => onUpdateStatus("approved")}
            title="Approve"
            icon={FaCheck}
            color="green"
          />
          <IconButton
            onClick={() => onUpdateStatus("rejected")}
            title="Reject"
            icon={FaTimes}
            color="red"
          />
        </>
      )}
      {onView && (
        <IconButton onClick={onView} title="View" icon={FaEye} color="blue" />
      )}
      {onEdit && (
        <IconButton onClick={onEdit} title="Edit" icon={FaEdit} color="green" />
      )}
      {onDelete && (
        <IconButton
          onClick={onDelete}
          title="Delete"
          icon={FaTrash}
          color="red"
        />
      )}
    </div>
  );
}
