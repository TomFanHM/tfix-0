import { CommentData } from "../getPosts";

export const dummyComments: CommentData[] = [
  {
    id: "abcd",
    receiverId: "12345",
    creatorId: "67890",
    createdAt: { seconds: 1626543600, nanoseconds: 0 },
    editedAt: { seconds: 1626543600, nanoseconds: 500000000 },
    content: "This is a dummy comment.",
    likes: {
      user1: true,
      user2: true,
      user3: false,
    },
    comments: 2,
    creatorDisplayName: "John Doe",
    creatorPhotoURL: "https://picsum.photos/id/237/200/300",
  },
  {
    id: "efgh",
    receiverId: "54321",
    creatorId: "09876",
    createdAt: { seconds: 1626547200, nanoseconds: 0 },
    content:
      "testing word break: xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx",
    likes: {
      user4: true,
      user5: false,
      user6: true,
    },
    comments: 0,
    creatorDisplayName: "Jane Smith",
    creatorPhotoURL: "https://picsum.photos/id/237/200/300",
  },
];
