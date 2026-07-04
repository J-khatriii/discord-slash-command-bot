const statusHandler = (req, res) => {
  return res.json({
    type: 4,
    data: {
      content: "Bot is online!",
    },
  });
};

export default statusHandler;
