import { initialFriends } from "./data-friends/data-friends";

export default function App() {
  return (
    <>
      <div className="app">
        <div className="sidebar">
          <FriendsList initialFriends={initialFriends} />
          <FormAddFriend />
          <Button>Add friend</Button>
        </div>
        <FormSplitBill />
      </div>
    </>
  );
}

function FriendsList() {
  return (
    <ul>
      {initialFriends.map((friend) => {
        return <Friend key={friend.id} friend={friend} />;
      })}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt="friend" />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)} EUR
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owed you {Math.abs(friend.balance)} EUR
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button>Select</Button>
    </li>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>👬 Friend name</label>
      <input type="text" />

      <label>🌄 Image URL</label>
      <input type="text" />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💰 Split bill</label>
      <input type="text" />

      <label>🧍‍♂️ Your expense</label>
      <input type="text" />

      <label>👬 X's expense</label>
      <input type="text" disabled />

      <label>💸 Who is paying a bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
