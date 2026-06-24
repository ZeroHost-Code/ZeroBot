const statuses = [
  { name: "ZeroHost", type: 0 },
  { name: "/help", type: 0 },
  { name: "zero-host.org", type: 0 },
  { name: "your tickets", type: 3 },
];

let index = 0;

function startStatusRotation(client) {
  const update = () => {
    const activity = statuses[index];
    client.user.setPresence({
      activities: [activity],
      status: "online",
    });
    index = (index + 1) % statuses.length;
  };

  update();
  setInterval(update, 15000);
}

module.exports = startStatusRotation;
