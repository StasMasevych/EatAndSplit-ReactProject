import { initialFriends } from "./data-friends/data-friends";

export default function App() {
  return (
    <>
      <div className="app">
        <div className="sidebar">
          <FriendsList initialFriends={initialFriends} />
        </div>
        <div>some bar</div>
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

      <button className="button">Select</button>
    </li>
  );
}
