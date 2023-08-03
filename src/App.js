import { useState } from "react";
import { initialFriends } from "./data-friends/data-friends";

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  /* const [selectedFriend, setSelectedFriend] = useState([]); */
  const [selectedFriend, setSelectedFriend] = useState(null);
  console.log(selectedFriend);

  function handleShowAddFriend() {
    setShowAddFriend(!showAddFriend);
  }

  function addFriend(friendObj) {
    setFriends(() => {
      const newFriendsArr = [...friends, friendObj];
      setShowAddFriend(false);
      return newFriendsArr;
    });
  }

  function handleSelectFriend(selectedObj) {
    // console.log(id);
    // to take obj options:
    // 1) filter one obj by id with new arr with this obj, destructure obj and take properties
    // 2) find obj in arr, and take this obj with properties
    // 3) take obj directly after action
    // here, opt 3) used

    //OR to receive just obj from arr by id
    /* setSelectedFriend(() => {
      return friends.filter((friend) => {
        return friend.id === id;
      });
    }); */

    /*  const selectedObj = friends.find((friend) => {
      return friend.id === id;
    }); */

    /* setSelectedFriend(selectedObj); */

    setSelectedFriend((selectedBefore) =>
      selectedBefore?.id === selectedObj.id ? null : selectedObj
    );

    setShowAddFriend(false);

    /* const [selectedObj] = arrWithselected; */

    /* if (selectedObj.id === id) {
      setSelected(selectedObj);
    } */

    /* if () {
      setIsSelected(true);
    } */
  }

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <FriendsList
            friends={friends}
            onSelectFriend={handleSelectFriend}
            selectedFriend={selectedFriend}
          />
          {showAddFriend && <FormAddFriend onAddFriend={addFriend} />}
          <Button onClick={handleShowAddFriend}>
            {showAddFriend ? "Close" : "Add friend"}
          </Button>
        </div>
        {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
      </div>
    </>
  );
}

function FriendsList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => {
        return (
          <Friend
            key={friend.id}
            friend={friend}
            onSelectFriend={onSelectFriend}
            selectedFriend={selectedFriend}
          />
        );
      })}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
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

      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [friendName, setFriendName] = useState("");
  const [friendImgUrl, setFriendImgUrl] = useState("");

  function handleSumbitFriend(e) {
    if (!friendName || !friendImgUrl) return;
    e.preventDefault();

    const addedFriend = {
      /* id: Date.now(), */
      id: crypto.randomUUID(),
      name: friendName,
      image: friendImgUrl,
      balance: 0,
    };

    setFriendName("");
    setFriendImgUrl("");

    /* console.log(addedFriend); */

    onAddFriend(addedFriend);

    return addedFriend;
  }

  return (
    <form className="form-add-friend" onSubmit={handleSumbitFriend}>
      <label>👬 Friend name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />

      <label>🌄 Image URL</label>
      <input
        type="text"
        value={friendImgUrl}
        onChange={(e) => setFriendImgUrl(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  const [bill, setBill] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("");

  const friendExpense = bill - userExpense;

  function handleSelectPayment() {}

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Split bill</label>
      <input type="text" onChange={(e) => setBill(Number(e.target.value))} />

      <label>🧍‍♂️ Your expense </label>
      <input
        type="text"
        value={userExpense}
        onChange={(e) => setUserExpense(Number(e.target.value))}
      />

      <label>👬 {selectedFriend.name} expense</label>
      <input type="text" disabled value={friendExpense} />

      <label>💸 Who is paying a bill?</label>
      <select onChange={handleSelectPayment}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
