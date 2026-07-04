const reportHandler = (req, res) => {
  const reportText = req.body.data.options[0].value;

  return res.json({
    type: 4,
    data: {
      content: `Report received: ${reportText}`,
    },
  });
};

export default reportHandler;
