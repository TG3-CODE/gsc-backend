const Vote = require("./model");

const getVotes = (req, res, next) => {
  Vote.find({})
    .then((items) => {
      res.send(items);
    })
    .catch(next);
};

const addVote = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Invalid name" });
  }
  try {
    // Update the vote count for the group

    const updated = await Vote.findOneAndUpdate(
      { name },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const removeVote = async (req, res, next) => {
  const { name } = req.body;
  console.log("POST /votes/remove called with:", name);

  if (!name) {
    return res.status(400).json({ error: "Invalid name" });
  }

  try {
    let vote = await Vote.findOne({ name });
    
    if (vote && vote.value > 0) {
      vote.value -= 1;
      await vote.save();
      console.log(`Vote removed: ${name} = ${vote.value}`);
      res.json(vote);
    } else {
      console.log(`No votes to remove for: ${name}`);
      res.status(400).json({ error: "No votes to remove" });
    }
  } catch (err) {
    console.error("Error removing vote:", err);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = { getVotes, addVote,removeVote};
