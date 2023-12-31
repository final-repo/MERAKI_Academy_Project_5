import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import Button from "../Button/Button";
import { CreateNewComment } from "../../Services/APIS/Comments/CreateNewComment";
import { GetCommentsByPost } from "../../Services/APIS/Posts/GetAllPosts";
import { getAllPostsByUser, setComments } from "../../Services/Redux/Posts";
import { addOrder } from "../../Services/Redux/Orders";
import { useNavigate } from "react-router-dom";
import { DeletePost } from "../../Services/APIS/Posts/DeletePost";
import Dialog_Modal from "../Dialog_Modal/Dialog_Modal";
import { DeleteServices } from "../../Services/APIS/Services/Delete_Serivces";
import { getUserServices } from "../../Services/Redux/Services";

function Post({
  imageSrc,
  altName,
  userImageClassName,
  bodyDivClassName,
  postDivClassName,
  userName,
  bodyClassName,
  body,
  userDivClassName,
  postImage,
  comments,
  numberOfComments,
  commentDivClassName,
  isShowComments,
  buttonsDivClass,
  postId,
  dispatch,
  postComments,
  title,
  isServices,
  subCategoryId,
  providerId,
  isShowButtons,
  setError,
  setLoading,
  userNameClassName,
  userAndPosterDivClassName,
  post,
  limit,
  offset,
}) {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [textValue, setTextValue] = useState("");
  const localUser = JSON?.parse(localStorage?.getItem("localUser")) ?? {};
  const [editClicked, setTEditClicked] = useState(true);

  const handlePostComment = async () => {
    CreateNewComment(postId, { comment })
      .then((res) => {
        console.log(res);
        return GetCommentsByPost(postId, 15, 1);
      })
      .then((comments) => {
        postComments[`post_${postId}`] = comments;
        dispatch(setComments(postComments));
      })
      .catch((err) => {
        if (err?.response?.data?.message === "Unauthorized") {
          return setError({ message: "You Are Unauthorized To Add Comment" });
        }
        setError(err);
      })
      .finally(() => {
        // setTextValue("");
        setLoading(false);
      });
  };

  const handleAddingOrder = async (service_id, provider_id) => {
    dispatch(addOrder({ provider_id, service_id }))
      .then((res) => {
        if (!res?.payload?.err) {
          setIsOpen(!isOpen);
          // console.log("Adding ORDER Error ===> ", res?.payload?.message);
        }
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div key={postId} className={postDivClassName}>
      {isOpen && (
        <Dialog_Modal
          isForm={false}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={"Order Added Successfully"}
          dialogPanelClassName={
            "rounded h-1/4 w-1/4 flex flex-col bg-gray-800 text-white py-8 px-4 text-center"
          }
          buttonClassName={`w-1/2 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium 
        text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3`}
          buttonDivClassName={"mt-2.5 w-5/6 self-center"}
          navigate={navigate}
          isOrder={true}
        />
      )}
      <div className={userAndPosterDivClassName}>
        <div className={`${userDivClassName}`}>
          <div>
            <img src={imageSrc} alt={altName} className={userImageClassName} />
          </div>
          <h3 className={userNameClassName}>{userName}</h3>
        </div>

        {isShowButtons && localUser?.isLoggedIn && (
          <div className={buttonsDivClass}>
            <Button
              buttonClassName={`focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-900`}
              buttonName={"Edit"}
              onClick={() => {
                if (post?.user?.user_type_id === 2) {
                  navigate(`/service/${post?.id}`);
                } else {
                  navigate(`/post/${post?.id}`);
                }
              }}
            />
            <Button
              buttonClassName={`focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-900`}
              buttonName={"Delete"}
              onClick={() => {
                if (post?.user?.user_type_id === 2) {
                  DeleteServices(post.id, 1)
                    .then((result) => {
                      if (result === "Service Deleted Successfully") {
                        return dispatch(getUserServices({ limit, offset }));
                      }
                    })
                    .then((result2) => {})
                    .catch((err) => {
                      setError(err);
                    });
                } else {
                  DeletePost(post.id, 1)
                    .then((result) => {
                      return dispatch(getAllPostsByUser({ limit, offset }));
                    })
                    .then((result2) => {})
                    .catch((err) => {
                      setError(true);
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                }
              }}
            />
          </div>
        )}

        {isServices && localUser?.isLoggedIn && (
          <Button
            buttonClassName={`mt-3 focus:outline-none text-white bg-blue-700 hover:bg-primary-5 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800
            `}
            buttonName={"Set Order"}
            onClick={() => handleAddingOrder(post?.id, post.provider_id)}
          />
        )}
        <div className={bodyDivClassName}>
          {title && <h3>{title}</h3>}
          <p className={bodyClassName}>{body}</p>
          <div className="flex justify-center items-center">
            <img src={postImage} />
          </div>
        </div>
      </div>

      {isShowComments ? (
        <div className="w-full px-4 pt-16">
          <div className="mx-auto w-full max-w-md rounded-2xl p-2">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full border bg-[#9BD3F5] border-primary-5 justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-cyan-950 hover:bg-primary-5 hover:text-[#FFFFFF] focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>Comments ({numberOfComments})</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className={commentDivClassName}>
                    {comments}
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                      <textarea
                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        placeholder="Write comment"
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <Button
                      buttonClassName={
                        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      }
                      buttonName={"Post"}
                      onClick={handlePostComment}
                    />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Post;
