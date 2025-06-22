const router = require("express").Router();
const { getVotes, addVote, removeVote } = require("./controllers");

/*router.post("/votes", (req, res) => {
  const { subject } = req.body;
  if (!subject) return res.status(400).send("No subject provided");
  votes[subject] = (votes[subject] || 0) + 1;
  return res.status(200).send("Vote counted");
});*/

router.get("/votes", getVotes);
router.post("/votes", addVote);
router.post("/votes/remove", removeVote);

module.exports = router;
