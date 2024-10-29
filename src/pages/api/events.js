// This file

let events = [
  // { date: '2024-10-26', description: 'Sample Event 1' },
  // { date: '2024-10-27', description: 'Sample Event 2' },
];

export default function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      handleGet(res);
      break;
    case "POST":
      handlePost(res, body);
      break;
    case "PUT":
      handlePut(res, body);
      break;
    case "DELETE":
      handleDelete(res, body);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function handleGet(res) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=300"
  );
  res.status(200).json(events);
}

function handlePost(res, body) {
  const { date, description } = body;
  if (!date || !description) {
    res.status(400).json({ error: "Date and description are required" });
    return;
  }
  const newEvent = { date, description };
  events.push(newEvent);
  res.status(201).json(newEvent);
}

function handlePut(res, body) {
  const { date, description } = body;
  if (!date || !description) {
    res.status(400).json({ error: "Date and description are required" });
    return;
  }
  events = events.map((event) =>
    event.date === date ? { date, description } : event
  );
  res.status(200).json({ message: "Event updated" });
}

function handleDelete(res, body) {
  console.log("here here here");
  const { date } = body;
  if (!date) {
    res.status(400).json({ error: "Date is required" });
    return;
  }
  events = events.filter((event) => event.date !== date);
  res.status(200).json({ message: "Event deleted" });
}
