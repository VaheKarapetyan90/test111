import { createApi } from "@reduxjs/toolkit/query/react";
import { chatState } from "../../components/meta/Context/ChatProvider";
import { getSocket } from "../../helpers/getSocket";
import { baseQuery } from "../axios";
import { ChatEvent, IMessages, IUsers } from "../types";

var currentUser: number;

export const Autentication = createApi({
  reducerPath: "auth",
  baseQuery: baseQuery,

  tagTypes: ["Auth", "socket"],

  refetchOnFocus: true,
  endpoints: (build) => ({
    login: build.mutation<{}, any>({
      query: (body) => ({
        method: "POST",
        url: "/auth/login",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),

    getMessagesById: build.mutation<any, any>({
      queryFn: (id: number) => {
        const data = localStorage.getItem("auth");
        const parsedData = typeof data === "string" && JSON.parse(data);
        const token = parsedData?.accessToken;
        const socket = getSocket(token);
        return new Promise((resolve) => {
          socket.emit(ChatEvent.GetChatAllMessage, id);
        });
      },
    }),

    sendMessage: build.mutation<any, any>({
      queryFn: (payload: { content: string; to: number; from: number }) => {
        const data = localStorage.getItem("auth");
        const parsedData = typeof data === "string" && JSON.parse(data);
        const token = parsedData?.accessToken;

        const socket = getSocket(token);
        return new Promise((resolve) => {
          socket.emit(ChatEvent.SendPrivateMessage, {
            content: payload.content,
            to: payload.to,
          });
        });
      },

      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        const data = {
          sender_id: payload.from,
          content: payload.content,
          status: "sent",
          //TO DO Need to add created_date in optimistic menual  update time
          // created_at: new Date(),
        };

        // OPTIMISTIC UPDATE FOR CHANGING ALL MESSAGES DRAFT
        const patchResult = dispatch(
          Autentication.util.updateQueryData(
            "getMessages",
            payload?.to,
            (draft) => {
              draft.push(data);
            }
          )
        );

        // OPTIMISTIC UPDATE FOR CHANGING LATEST MESSAGE IN CARD COMPONENT
        const changeSenderLatestMessage = dispatch(
          Autentication.util.updateQueryData(
            "getUsers",
            payload?.to,
            (draft) => {
              draft["usersAndChats"].forEach((element: any) => {
                if (element.id == payload?.to) {
                  const { content } = payload;
                  element.latest_message = content;
                  element.lt_msg_file = "";
                  return element;
                }
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          changeSenderLatestMessage.undo();
        }
      },
    }),

    changeNotificationStatus: build.mutation<any, any>({
      queryFn: (payload: {}) => {
        const data = localStorage.getItem("auth");
        const parsedData = typeof data === "string" && JSON.parse(data);
        const token = parsedData?.accessToken;
        const socket = getSocket(token);
        return new Promise((resolve) => {});
      },

      //OPTIMISTIC UPDATE FOR CHANGING NOTIFICATION COUNT IF THE USER CLICK ON THE CARD AND SEE THE MESSAGE
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          Autentication.util.updateQueryData(
            "getUsers",
            //payload.to changed to payload(because peyload.to is undefined, payload is number(ID)),
            //փոռձել եմ արաջին անգամ մեսիջ ռեքվեստի ժամանակ, երբ քլիք ենք անում քարդի վրա նոթիֆիքեյշնը չի զրոյանում
            payload,
            (draft) => {
              draft["usersAndChats"].forEach((element: any) => {
                if (element.id === payload) {
                  return (element.notification = 0);
                }
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    sendFile: build.mutation<any, any>({
      queryFn: (payload: { content: string; to: number; from: number }) => {
        const data = localStorage.getItem("auth");
        const parsedData = typeof data === "string" && JSON.parse(data);
        const token = parsedData?.accessToken;
        const socket = getSocket(token);
        return new Promise((resolve, reject) => {
          socket.emit(
            ChatEvent.SendPrivateFile,
            { content: payload.content, to: payload.to },
            (status: { message: string }) => {
              if (status?.message === "success") {
                resolve({ data: true });
              } else {
                reject({ data: false });
              }
            }
          );
        });
      },

      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          const data = {
            sender_id: payload.from,
            file: payload.content.name,
            status: "sent",
            // created_at: new Date(),
          };
          // OPTIMISTIC UPDATE FOR CHANGING ALL MESSAGES DRAFT, FOR FILE
          const patchResult = dispatch(
            Autentication.util.updateQueryData(
              "getMessages",
              payload?.to,
              (draft) => {
                draft.push(data);
              }
            )
          );
          // OPTIMISTIC UPDATE FOR CHANGING LATEST MESSAGE IN CARD COMPONENT, FOR FILE
          const changeSenderLatestFile = dispatch(
            Autentication.util.updateQueryData(
              "getUsers",
              payload?.to,
              (draft) => {
                draft["usersAndChats"].forEach((element: any) => {
                  if (element.id == payload?.to) {
                    element.lt_msg_file = payload?.content?.name;
                    element.latest_message = "";
                    return element;
                  }
                });
              }
            )
          );
        } catch {}
      },
    }),

    typing: build.mutation<any, any>({
      queryFn: (data: number) => {
        const ls = localStorage.getItem("auth");
        const parsedData = typeof ls === "string" && JSON.parse(ls);
        const token = parsedData?.accessToken;
        const socket = getSocket(token);
        return new Promise((resolve) => {
          socket.emit(ChatEvent.TYPING, data, (message: any) => {
            resolve({ data: message });
          });
        });
      },
    }),

    stopTyping: build.mutation<any, any>({
      queryFn: (data: number) => {
        const ls = localStorage.getItem("auth");
        const parsedData = typeof ls === "string" && JSON.parse(ls);
        const token = parsedData?.accessToken;
        const socket = getSocket(token);
        return new Promise((resolve) => {
          socket.emit(ChatEvent.StopTyping, data, (message: any) => {
            resolve({ data: message });
          });
        });
      },
    }),

    answerToChatRequest: build.mutation<any, any>({
      queryFn: (payload: {}) => {
        const ls = localStorage.getItem("auth");
        const parsedData = typeof ls === "string" && JSON.parse(ls);
        const token = parsedData?.accessToken;
        const socket = getSocket(token);
        return new Promise((resolve) => {
          socket.emit(ChatEvent.AnswerChatRequest, payload);
          // console.log("emit AnswerChatRequest", payload);
          return payload;
        });
      },

      //MENUAL OPTIMISTIC UPDATE FOR CHANGING USER STATUS

      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          Autentication.util.updateQueryData(
            "getMessagesInfo",
            payload?.to,
            (draft) => {
              draft["chat"] = { ...draft.chat, chat_status: payload.status };
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    socketConnection: build.query<any, void>({
      queryFn: () => ({ data: {} }),

      async onCacheEntryAdded(
        args,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
          const data = localStorage.getItem("auth");
          const parsedData = typeof data === "string" && JSON.parse(data);
          const token = parsedData?.accessToken;
          const socket = getSocket(token);

          socket.on("connect", () => {
            console.log("Successfully connected");
          });
          await cacheEntryRemoved;
          // socket.off("connect");
        } catch {
          console.log("errr");
        }
      },
    }),

    getMessagesByChatId: build.query<any, any>({
      query: (payload) => ({
        url: `/messages/${payload.id}?limit=20&offset=${payload?.page * 20}`,
      }),
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },

      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.length == 0) return;
          const reverted = [...data].reverse();

          const messageResult = dispatch(
            Autentication.util.updateQueryData(
              "getMessages",
              payload?.to,
              (draft) => {
                draft.splice(0, draft.length, ...[...reverted, ...draft]);
              }
            )
          );
        } catch {}
      },
    }),

    getMessages: build.query<any, any>({
      queryFn: () => ({ data: [] }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        currentUser = queryArgs?.currentUser;
        return endpointName;
      },

      async onCacheEntryAdded(
        args,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;

          const ls = localStorage.getItem("auth");
          const parsedData = typeof ls === "string" && JSON.parse(ls);
          const token = parsedData?.accessToken;
          const socket = getSocket(token);

          socket.on(ChatEvent.GetChatAllMessage, (messages: []) => {
            messages = messages || [];
            const reverted = [...messages].reverse();
            updateCachedData((draft) => {
              draft.splice(0, draft.length, ...reverted);
            });
          });

          socket.on(ChatEvent.SendPrivateMessage, (payload: any) => {
            const { msg_id, sender_id } = payload;

            if (sender_id !== currentUser) return;

            updateCachedData((draft) => {
              draft.push(payload);
            });

            socket.emit(ChatEvent.ReceivePrivateMessage, {
              sender_id,
              receiver_id: args?.loggedInUser,
              msg_id,
              status: "seen",
            });
          });

          socket.on(
            ChatEvent.SendPrivateFile,
            (payload: { msg_id: string; sender_id: number }) => {
              const { msg_id, sender_id } = payload;
              if (sender_id !== currentUser) return;

              updateCachedData((draft) => {
                draft.push(payload);
              });

              socket.emit(ChatEvent.ReceivePrivateMessage, {
                sender_id,
                receiver_id: args?.loggedInUser,
                msg_id,
                status: "seen",
              });
            }
          );

          socket.on(
            ChatEvent.ReceivePrivateMessage,
            (payload: { receiver_id: number; status: string }) => {
              const { receiver_id, status } = payload;

              if (receiver_id !== currentUser) return;

              updateCachedData((draft) => {
                draft?.forEach((element: { status: string }) => {
                  if (element.status !== "seen") {
                    console.log("status", status);
                    element.status = status;
                  }
                  return element;
                });
              });
            }
          );

          await cacheEntryRemoved;
          // socket.off(ChatEvent.SendPrivateMessage);
          // socket.off(ChatEvent.SendPrivateFile);
          // socket.off(ChatEvent.GetChatAllMessage);
        } catch {
          console.log("errr");
        }
      },
    }),

    typeingData: build.query<any, void>({
      queryFn: () => ({ data: {} }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;

          const ls = localStorage.getItem("auth");
          const parsedData = typeof ls === "string" && JSON.parse(ls);
          const token = parsedData?.accessToken;
          const socket = getSocket(token);
          socket.on(ChatEvent.TYPING, (payload: any) => {
            updateCachedData((draft) => {
              Object.assign(draft, payload);
            });
          });

          socket.on(ChatEvent.StopTyping, (payload: any) => {
            updateCachedData((draft) => {
              Object.assign(draft, payload);
            });
          });

          await cacheEntryRemoved;
        } catch {}
      },
    }),

    ReceivePrivateMessage: build.mutation<any, any>({
      queryFn: (payload: {
        sender_id: number;
        chat_id: number;
        receiver_id: number;
      }) => {
        const ls = localStorage.getItem("auth");
        const parsedData = typeof ls === "string" && JSON.parse(ls);
        const token = parsedData?.accessToken;
        const socket = getSocket(token);
        return new Promise((resolve) => {
          socket.emit(ChatEvent.ReceivePrivateMessage, {
            sender_id: payload?.sender_id,
            receiver_id: payload?.receiver_id,
            chat_id: payload?.chat_id,
            status: "received",
          });

          return payload;
        });
      },
    }),

    getUsers: build.query<IUsers, string | any>({
      query: (search) => ({
        url: `${search ? `/users/chats?search=${search}` : "/users/chats"}`,
      }),

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        if (
          queryArgs != undefined &&
          queryArgs != null &&
          typeof queryArgs !== "string"
        ) {
          currentUser = queryArgs;
        }

        return endpointName;
      },

      async onCacheEntryAdded(
        args,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;

          const ls = localStorage.getItem("auth");
          const parsedData = typeof ls === "string" && JSON.parse(ls);
          const token = parsedData?.accessToken;
          const socket = getSocket(token);
          socket.on(ChatEvent.SendNotification, (payload: any) => {
            const { msg_id, sender_id, content, file } = payload;

            if (sender_id !== currentUser) {
              updateCachedData((draft) => {
                draft["usersAndChats"].forEach((element: any) => {
                  if (element.id === sender_id) {
                    element.notification = Number(element.notification) + 1;
                    content
                      ? ((element.latest_message = content),
                        (element.lt_msg_file = ""))
                      : ((element.lt_msg_file = file),
                        (element.latest_message = ""));
                    return element;
                  }
                });
              });

              // TODO
              // socket.emit(ChatEvent.ReceivePrivateMessage, {
              //   sender_id,
              //   receiver_id: loggedinUserId,
              //   msg_id,
              //   status: "received",
              // });
            } else {
              updateCachedData((draft) => {
                draft["usersAndChats"].forEach((element: any) => {
                  if (element.id === sender_id) {
                    content
                      ? ((element.latest_message = content),
                        (element.lt_msg_file = ""))
                      : ((element.lt_msg_file = file),
                        (element.latest_message = ""));
                    return element;
                  }
                });
              });
            }
          });
          socket.on(ChatEvent.CONNECTION, (payload: any) => {
            updateCachedData((draft) => {
              if (payload.active === true) {
                draft["activeUserIds"].push(payload?.id);
              } else {
                draft["activeUserIds"] = draft["activeUserIds"].filter(
                  (userId: number) => userId != payload.id
                );
              }
            });
          });
          await cacheEntryRemoved;
        } catch {}
      },
    }),

    getMessagesInfo: build.query<any, any>({
      query: (id) => ({
        url: `/chats/${id}`,
      }),

      async onCacheEntryAdded(
        undefined,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;

          const ls = localStorage.getItem("auth");
          const parsedData = typeof ls === "string" && JSON.parse(ls);
          const token = parsedData?.accessToken;
          const socket = getSocket(token);
          socket.on(
            ChatEvent.AnswerChatRequest,
            (payload: { to: number; from: number; chat: {} }) => {
              updateCachedData((draft) => {
                if (draft?.user_id === payload.from) {
                  draft["chat"] = payload.chat;
                }
              });
            }
          );

          socket.on(ChatEvent.CONNECTION, (payload: any) => {
            updateCachedData((draft) => {
              if (Object.entries(draft["userStatus"]).length > 0) {
                if (draft?.user_id === payload?.id) {
                  draft["userStatus"]["active"] = payload?.active;
                  draft["userStatus"]["last_seen"] = payload?.last_seen;
                }
              }
            });
          });

          await cacheEntryRemoved;
          // socket.off(ChatEvent.AnswerChatRequest);
        } catch {}
      },
    }),
  }),
});

export const {
  useTypeingDataQuery,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useLoginMutation,
  useTypingMutation,
  useGetMessagesQuery,
  useSendFileMutation,
  useStopTypingMutation,
  useSendMessageMutation,
  useLazyGetMessagesQuery,
  useSocketConnectionQuery,
  useLazySocketConnectionQuery,
  useGetMessagesByIdMutation,
  useLazyGetMessagesInfoQuery,
  useGetMessagesInfoQuery,
  useReceivePrivateMessageMutation,
  useGetMessagesByChatIdQuery,
  useAnswerToChatRequestMutation,
  useChangeNotificationStatusMutation,
  useLazyGetMessagesByChatIdQuery,
} = Autentication;
