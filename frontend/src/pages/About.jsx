import React from "react";
import { useAuth } from "../context/AuthProvider";

function About() {
  const { profile, loading } = useAuth(); // ✅ get loading

  if (loading) {
    return <p className="text-center mt-10 text-lg font-medium">Loading profile...</p>;
  }

  if (!profile) {
    return <p className="text-center mt-10 text-lg font-medium text-red-500">User not found!</p>;
  }

  return (
    <div className="container mx-auto my-12 p-4 space-y-9">
      <div className="flex flex-col items-center mb-6">
        <img
          src={profile?.photo?.url}
          alt={profile?.name}
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
        />
        <h1 className="text-3xl font-bold mt-4">About</h1>
        <p className="text-gray-600 mt-2">Hi, I am {profile?.name}</p>
      </div>

      <p>
        This is{" "}
        <strong className="text-blue-800 font-semibold hover:scale-105 duration-500">
          {profile?.name}
        </strong>{" "}
        a proficient full stack developer with a robust skill set spanning both
        front-end and back-end technologies. With a passion for building
        dynamic, responsive, and user-friendly web applications, {profile?.name} excels in
        crafting seamless digital experiences.
      </p>

      <h2 className="font-semibold text-blue-800 text-xl">Technical Expertise:</h2>
      <p>
        Front-End: Adept in modern JavaScript frameworks and libraries such as
        React.js, Angular, and Vue.js. Skilled in HTML5, CSS3, and responsive
        design principles to create intuitive and visually appealing interfaces.
        Back-End: Proficient in server-side technologies including Node.js,
        Express.js, and Django. Experienced with database management using SQL
        and NoSQL databases like MySQL, PostgreSQL, and MongoDB. DevOps:
        Knowledgeable in containerization and orchestration tools such as Docker
        and Kubernetes. Familiar with continuous integration and deployment
        (CI/CD) pipelines. Cloud Services: Experience with cloud platforms like
        AWS, Azure, and Google Cloud, enabling scalable and reliable application
        deployment.
      </p>

      <h2 className="font-semibold text-blue-800 text-xl">Professional Highlights:</h2>
      <p>
        Successfully developed and deployed numerous full-stack applications,
        demonstrating strong problem-solving skills and a keen eye for detail.
        Collaborated with cross-functional teams to deliver high-quality
        software solutions within tight deadlines. Continuously learning and
        adapting to emerging technologies and industry trends to stay ahead in
        the fast-evolving tech landscape.
      </p>

      <p className="mt-4">
        {profile?.name} is dedicated to leveraging his expertise to contribute to
        innovative projects and drive technological advancements. Whether
        working on front-end interfaces or back-end logic, he is passionate
        about delivering exceptional digital solutions that meet user needs and
        exceed client expectations.
      </p>

      <h2 className="font-semibold text-blue-800 text-xl">
        Personal Interests and Inspiration:
      </h2>
      <p>
        Beyond his professional achievements, {profile?.name} is a big fan of cricket and
        holds immense admiration for <strong> King Kohli.</strong> His favorite
        person and biggest inspiration is his twin brother,{" "}
        <strong>Ankush.</strong> Their friendly rivalry and deep bond have
        significantly shaped {profile?.name}’s journey. Ankush is not only a great
        competitor but also a steadfast friend, constantly motivating him to
        strive for excellence.
      </p>
    </div>
  );
}

export default About;
