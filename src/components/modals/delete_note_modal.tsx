import clsx from "clsx";
import Modal from ".";
import deleteSvg from "../../assets/icon-delete.svg";
import { deleteNote, noteDataTypes } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useNotesStore } from "../../stores/useNotesStore";
import { useUIStore } from "../../stores/useUIStore";
import DeleteSvgDetailsDarkMode from "../../assets/icons/delete_svg_details_dark_mode";

function DeleteNoteModal(props: { selectedNote: noteDataTypes }) {
  const navigate = useNavigate();

  const { openDeleteModal, setOpenDeleteModal, fetchNotes } = useNotesStore();
  const { darkMode } = useUIStore();

  const handleDelete = async () => {
    try {
      await deleteNote(props.selectedNote._id);

      fetchNotes();

      setOpenDeleteModal(false);
      navigate("/");
    } catch (err) {
      console.error("error deleting note", err);
    }
  };

  return (
    <Modal isOpen={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
      <div
        className={clsx(
          darkMode ? "bg-[#2B303B]" : "bg-[#FFF]",
          "flex flex-col"
        )}
      >
        <div className="flex items-start gap-[1rem] mb-[1.25rem]">
          {darkMode ? (
            <div className="bg-[#525866] p-[0.75rem] rounded-lg select-none">
              <DeleteSvgDetailsDarkMode />
            </div>
          ) : (
            <img
              src={deleteSvg}
              alt="deleteSvg"
              className="bg-[#F3F5F8] p-[0.75rem] rounded-lg select-none"
            />
          )}
          <div className="flex flex-col gap-[0.5rem]">
            <h2
              className={clsx(
                darkMode ? "text-[#FFF]" : "text-[#0E121B]",
                "text-[1rem] leading-[1.25rem] font-[600]"
              )}
            >
              Delete Note
            </h2>
            <p
              className={clsx(
                darkMode ? "text-[#E0E4EA]" : "text-[#2B303B]",
                "text-[0.875rem] leading-[1.25rem] font-[400]"
              )}
            >
              Are you sure you want to permanently delete this note? This action
              cannot be undone.
            </p>
          </div>
        </div>
        <span
          className={clsx(
            darkMode ? "bg-[#525866]" : "bg-[#E0E4EA]",
            "flex h-[0.0625rem] w-full"
          )}
        />
        <div className="flex justify-end mt-[1rem] gap-[1rem] w-full">
          <button
            className={clsx(
              darkMode
                ? "bg-[#717784] text-[#E0E4EA] hover:bg-[#717784ab]"
                : "bg-[#F3F5F8] text-[#525866] hover:bg-[#e7e9ec]",
              "text-[0.85rem] leading-[1.45rem] font-[500] px-[1rem] py-[0.5rem] rounded-lg w-full max-w-[4.875rem] cursor-pointer transition-all duration-200"
            )}
            onClick={() => setOpenDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="text-[0.85rem] leading-[1.45rem] font-[500] text-[#FFF] px-[1rem] py-[0.5rem] bg-[#FB3748] rounded-lg hover:bg-[#fb3747c7] w-full max-w-[7rem] cursor-pointer transition-all duration-200"
          >
            Delete Note
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteNoteModal;
