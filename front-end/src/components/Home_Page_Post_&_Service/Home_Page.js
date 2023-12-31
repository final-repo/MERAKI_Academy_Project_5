import React from "react";
import Post from "../Post/Post";
import Comment from "../Comment/Comment";
import Pagination from "../Pagination/Pagination";

const Home_Page = ({
  postsArray,
  servicesArray,
  toggle,
  setError,
  setLoading,
  dispatch,
  postComments,
  commentsArray,
  handlePage,
  limit,
  offset,
  setOffset,
}) => {
  return (
    <>
      {toggle
        ? postsArray?.map((newPost) => {
            return (
              <>
                <Post
                  key={newPost?.id}
                  postId={newPost?.id}
                  post={newPost}
                  isShowComments={true}
                  userAndPosterDivClassName={
                    "border-b-[2px] border-primary-5 pb-4"
                  }
                  setError={setError}
                  setLoading={setLoading}
                  isShowButtons={false}
                  dispatch={dispatch}
                  postComments={postComments}
                  bodyDivClassName={"mt-4 mx-20"}
                  userName={newPost?.user?.nick_name}
                  body={newPost?.description}
                  userDivClassName={"flex flex-row"}
                  postDivClassName={
                    "border-primary-5 border my-6 px-4 py-4 rounded-lg bg-[#EFF7FA] mx-auto mt-12 w-1/2 shadow-xl"
                  }
                  imageSrc={newPost?.user?.image}
                  postImage={newPost?.main_image}
                  commentDivClassName={
                    "border-primary-5 bg-primary-5 border-2 mx-4 my-6 px-2 py-4 rounded-lg"
                  }
                  userNameClassName={"text-base font-bold text-sky-700 mt-2"}
                  userImageClassName={
                    "object-cover w-16 h-16 rounded-full border-2 border-[#365194]  shadow-[#365194] mr-4"
                  }
                  numberOfComments={
                    commentsArray[`post_${newPost.id}`]?.length ?? 0
                  }
                  comments={commentsArray[`post_${newPost.id}`]?.map(
                    (comment) => {
                      return (
                        <>
                          <Comment
                            comment_id={comment?.id}
                            key={comment?.id}
                            fullCommentDivClassName={
                              "border bg-[#F5F5DD] border-primary-5 my-6 px-2 py-4 rounded-lg"
                            }
                            commenterImage={comment?.user?.image}
                            commenterFullName={comment?.user?.full_name}
                            createdAt={comment?.created_at}
                            comment={comment?.comment}
                            commenterFullNameClassName={"font-bold"}
                            commenterDivClassName={
                              "flex justify-around items-center"
                            }
                            commentClassName={"text-gray-600 mt-2"}
                            createdAtClassName={"text-[12px]"}
                          />
                        </>
                      );
                    }
                  )}
                />
              </>
            );
          })
        : servicesArray?.map((service) => {
            return (
              <>
                <Post
                  post={service}
                  key={service?.id}
                  setError={setError}
                  setLoading={setLoading}
                  isServices={true}
                  title={service?.title}
                  userName={service?.user?.nick_name}
                  body={service?.description}
                  userNameClassName={"font-bold"}
                  userDivClassName={"flex flex-row"}
                  userImageClassName={
                    "object-cover w-16 h-16 rounded-full border-2 border-[#365194]  shadow-[#365194] mr-4"
                  }
                  postDivClassName={
                    "border-primary-5 border my-6 px-4 py-4 rounded-lg bg-[#DEF2FE] mx-auto mt-12 w-1/2 shadow-xl"
                  }
                  imageSrc={service?.user?.image}
                  postImage={service?.default_image}
                  isShowComments={false}
                  subCategoryId={service?.sub_category_id}
                  postId={service?.id}
                  providerId={service?.provider?.id}
                  dispatch={dispatch}
                />
              </>
            );
          })}
      {postsArray?.length !== 0 && (
        <Pagination
          handlePage={handlePage}
          limit={limit}
          offset={offset}
          setOffset={setOffset}
        />
      )}
    </>
  );
};

export default Home_Page;
