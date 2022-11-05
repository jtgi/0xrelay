import PScale from "../db";

export async function getServerSideProps(context) {
  const db = new PScale();
  const users = await db.getUsers() || [];

  return {
    props: {
      users
    }
  }
}

export default function Admin({ users }) {
  return (
    <div>
      <h1>Admin</h1>
      <pre>
        {JSON.stringify(users, null, "  ")}
      </pre>
    </div>
  );
}
