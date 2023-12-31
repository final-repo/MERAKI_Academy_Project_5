import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversationRedux } from "../../Services/Redux/Chats";
import Loader from "../../components/Loader/Loader";
import { Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

const Conversations = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const conversationsSelector = useSelector((state) => {
    return {
      conversations: state.chats,
    };
  });

  useEffect(() => {
    dispatch(getConversationRedux())
      .then((result) => {})
      .catch((err) => {
        console.log("CONVERSATIONS ERROR ===> ", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="overflow-auto flex flex-col justify-center items-center w-full min-h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex">
            <div className="flex flex-col justify-start items-center h-screen w-1/6 border border-gray-500 ml-3 mr-2">
              {conversationsSelector?.conversations?.conversations.map(
                (conversation) => (
                  <NavLink
                    key={conversation.id}
                    to={`/chats/${conversation?.id}/${conversation?.customer?.id}/${conversation?.customer?.full_name}`}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base w-full h-28"
                        : isActive
                        ? "bg-neutral-700 text-white flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base w-full h-28"
                        : "text-neutral-400 flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base w-full h-28"
                    }
                  >
                    <span className="text-xl">
                      {/* <FcBullish /> */}
                      <img
                        src={conversation?.customer?.image}
                        height={"80px"}
                        width={"80px"}
                      />
                    </span>
                    {conversation?.customer?.full_name}
                  </NavLink>
                )
              )}
            </div>
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};

export default Conversations;
