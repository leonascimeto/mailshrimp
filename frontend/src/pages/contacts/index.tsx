import Link from "next/link";

export default function Contacts() {
  const seeeders = [
    { name: "John Doe", id: 1 },
    { name: "Jane Doe", id: 2 },
    { name: "John Smith", id: 3 },
    { name: "Jane Smith", id: 4 },
    { name: "Carl Zaw", id: 5 },
  ]

  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        {
          seeeders.map((seeeder) => (
            <li key={seeeder.id}>
              <Link href={`/contact/${seeeder.id}`}>
                {seeeder.name}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}