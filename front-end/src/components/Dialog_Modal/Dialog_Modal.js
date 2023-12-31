import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import Button from "../Button/Button";
import {
  AddCategory,
  AddSubCategory,
} from "../../Services/APIS/Category/Add_Category";
import {
  GetCategories,
  GetSubCategories,
} from "../../Services/APIS/Category/Get_Categories";
import { setCategories } from "../../Services/Redux/Category";
import { setSubCategories } from "../../Services/Redux/Sub_Categories";
import CategoryForm from "./CategoryForm";
import Sub_CategoryForm from "./Sub_CategoryForm";
import RegionForm from "./RegionForm";
import { AddRegion } from "../../Services/APIS/Regions/AddRegion";
import { GetAllRegions } from "../../Services/APIS/Regions/GetRegions";
import { setRegions } from "../../Services/Redux/regions/regions";
// import { addCategory } from "../../Services/Redux/Category";

const Dialog_Modal = ({
  isOpen,
  setIsOpen,
  isForm,
  title,
  dialogPanelClassName,
  buttonClassName,
  buttonDivClassName,
  navigate,
  isUpdateCategory,
  isUpdateSubCategory,
  isOrder,
  isSubCategory,
  isCategory,
  isRegions,
  isPosts,
  limit,
  offset,
  setIsError,
  setIsLoading,
}) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState({
    name: "",
    image: "",
  });

  const [subCategory, setSubCategory] = useState({
    name: "",
    category_id: 0,
    image: "",
  });

  const [region, setRegion] = useState({
    name: "",
  });

  const [isAdded, setIsAdded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCategory) {
      AddCategory(category)
        .then((result) => {
          if (result?.includes("Category Created Successfully")) {
            setIsAdded(true);
          }
        })
        .catch((err) => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (isSubCategory) {
      AddSubCategory(subCategory)
        .then((result) => {
          if (result?.includes("Sub Category Created Successfully")) {
            setIsAdded(true);
          }
        })
        .catch((err) => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (isRegions) {
      AddRegion(region)
        .then((result) => {
          if (result?.includes("Region Created Successfully")) {
            setIsAdded(true);
          }
        })
        .catch((err) => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      className={
        "fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
      }
    >
      {/* "rounded h-1/2 w-1/2 flex flex-col bg-gray-800 text-white py-8 px-4 text-center" */}
      <Dialog.Panel className={dialogPanelClassName}>
        <Dialog.Title
          className={`text-${isForm ? "red" : "white"}-500 text-3xl`}
        >
          {title}
        </Dialog.Title>

        {isForm &&
          (isCategory ? (
            <CategoryForm
              category={category}
              handleSubmit={handleSubmit}
              setCategory={setCategory}
            />
          ) : isSubCategory ? (
            <Sub_CategoryForm
              subCategory={subCategory}
              handleSubmit={handleSubmit}
              setSubCategory={setSubCategory}
            />
          ) : isRegions ? (
            <RegionForm
              handleSubmit={handleSubmit}
              region={region}
              setRegion={setRegion}
            />
          ) : (
            <></>
          ))}

        {isAdded && <h3>Added Succefully</h3>}

        <Button
          buttonClassName={buttonClassName}
          buttonName={`${isForm ? "Cancel" : "Done"}`}
          divClassName={buttonDivClassName}
          onClick={() => {
            if (isForm) {
              if (isCategory) {
                GetCategories(limit, offset, 1)
                  .then((result) => {
                    dispatch(setCategories(result));
                    setIsOpen(!isOpen);
                  })
                  .catch((err) => {
                    setIsError(true);
                  })
                  .finally(() => {
                    setIsLoading(false);
                  });
              } else if (isSubCategory) {
                GetSubCategories(limit, offset, 1)
                  .then((result) => {
                    dispatch(setSubCategories(result));
                    setIsOpen(!isOpen);
                  })
                  .catch((err) => {
                    setIsError(true);
                  })
                  .finally(() => {
                    setIsLoading(false);
                  });
              } else if (isRegions) {
                GetAllRegions(limit, offset)
                  .then((result) => {
                    dispatch(setRegions(result));
                    setIsOpen(!isOpen);
                  })
                  .catch((err) => {
                    setIsError(true);
                  })
                  .finally(() => {
                    setIsLoading(false);
                  });
              }
            } else if (isUpdateCategory) {
              navigate("/Admin/categories");
            } else if (isUpdateSubCategory) {
              navigate("/Admin/sub-categories");
            } else if (isOrder) {
              navigate("/");
            }
          }}
        />
      </Dialog.Panel>
    </Dialog>
  );
};

export default Dialog_Modal;
