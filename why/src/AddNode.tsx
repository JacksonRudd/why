  // when the node is added, let's create an event that will be triggered
function AddNode() {
  return (
    <div>
      <form>
        <input type="text" placeholder="Node name"></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}



export default AddNode;
