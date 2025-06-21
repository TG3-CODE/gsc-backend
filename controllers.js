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

module.exports = { getVotes, addVote };
