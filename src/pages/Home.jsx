import { useNavigate } from "react-router";

import Layout from "../components/layout/Layout";
import RoadmapForm from "../components/roadmap/RoadmapForm";
import { useEffect } from "react";
import { getAppData } from "../utils/storage";

const Home = () => {
  useEffect(() => {
    const { roadmaps } = getAppData();

    if (roadmaps.length > 0) {
      navigate("/dashboard");
    }
  }, []);

  const navigate = useNavigate();

  return (
    <Layout>
      <div className="mx-auto max-w-3xl py-28">

        <div className="mt-20">
          <RoadmapForm
            onSuccess={(roadmap) =>
              navigate(
                `/roadmap/${roadmap.id}?new=true`
              )
            }
          /></div>

      </div>
    </Layout>
  );
};

export default Home;