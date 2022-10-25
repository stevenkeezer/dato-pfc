import { gql, GraphQLClient } from "graphql-request";
import { useEffect } from "react";

export default function Home({ data: { allPosts } }) {
  function revalidate() {
    fetch("/api/revalidate");
  }

  useEffect(() => {
    revalidate();
  }, []);

  return (
    <div className="bg-gray-200">
      <div className="container grid flex-col justify-center min-h-screen grid-cols-3 gap-3 p-4 mx-auto">
        {allPosts?.map((post) => (
          <div key={post?.id} className="p-4 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold text-red-500">{post?.title}</h1>
            <p className="mt-2 text-gray-600">{post?.id}</p>
          </div>
        ))}
        <button onClick={() => revalidate()}>Revalidate</button>
      </div>
    </div>
  );
}

const query = gql`
  query {
    allPosts {
      id
      title
    }
  }
`;

export async function getStaticProps() {
  const graphcms = "https://graphql.datocms.com/";
  const graphcmsClient = new GraphQLClient(graphcms, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
  });

  const data = await graphcmsClient.request(query);

  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}
