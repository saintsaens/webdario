import { vi, test, expect } from "vitest";
import db from "../../db-users/index.js";
import { createUser, getUserById, updateUser, deleteUser } from "../../repositories/usersRepository.js";

vi.mock('../../db-users/index.js', () => {
  return {
    default: { query: vi.fn() },
    query: vi.fn(),
  };
});

describe("createUser", () => {
  it("should insert a user and return id, username, session data", async () => {
    const mockUser = {
      id: 1,
      username: "testuser",
      role: "user",
      session_start_time: "2025-02-10T10:00:00Z",
      last_activity_time: "2025-02-10T10:00:00Z",
      time_spent: "0 seconds"
    };

    vi.mocked(db.query).mockResolvedValueOnce({ rows: [mockUser] });

    const result = await createUser("testuser", "hashedpassword", "user");

    expect(result).toEqual(mockUser);
  });
});

describe("getUserById", () => {
  it("should retrieve a user by its ID with session data", async () => {
    const mockUser = {
      id: 1,
      username: "testuser",
      role: "user",
      session_start_time: "2025-02-10T10:00:00Z",
      last_activity_time: "2025-02-10T10:00:00Z",
      time_spent: "0 seconds"
    };

    vi.mocked(db.query).mockResolvedValueOnce({ rows: [mockUser] });

    const result = await getUserById(1);

    expect(result).toEqual(mockUser);
  });
});

describe("updateUser", () => {
  it("should update user fields and return the updated user with session data", async () => {
    const mockUpdatedUser = {
      id: 1,
      username: "updatedUser",
      hashed_pw: "newhashedpassword",
      session_start_time: "2025-02-10T10:00:00Z",
      last_activity_time: "2025-02-10T10:05:00Z",
      time_spent: "5 minutes"
    };

    vi.mocked(db.query).mockResolvedValueOnce({ rows: [mockUpdatedUser] });

    const result = await updateUser(1, "updatedUser", "newhashedpassword", "2025-02-10T10:00:00Z", "2025-02-10T10:05:00Z", "5 minutes");

    expect(result).toEqual(mockUpdatedUser);
  });
});

describe("deleteUser", () => {
  it("should delete a user and return its former data with session info", async () => {
    const mockDeletedUser = {
      id: 1,
      username: "testuser",
      session_start_time: "2025-02-10T10:00:00Z",
      last_activity_time: "2025-02-10T10:00:00Z",
      time_spent: "0 seconds"
    };

    vi.mocked(db.query).mockResolvedValueOnce({ rows: [mockDeletedUser] });

    const result = await deleteUser(1);

    expect(result).toEqual(mockDeletedUser);
  });
});
