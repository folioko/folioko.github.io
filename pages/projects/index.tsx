import { pick } from "@contentlayer/client";
import { allProjects, Project } from ".contentlayer/generated";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import Halo from "components/Halo";

const seoTitle = "Blog | Brian Ruiz";
const seoDesc =
  "I write about development, design, React, CSS, animation and more!";

type ProjectsProps = {
  projects: Project[];
};

export default function Projects({ projects }: ProjectsProps) {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDesc}
        openGraph={{
          title: seoTitle,
          url: `https://b-r.io/projects/`,
          description: seoDesc,
          site_name: "Brian Ruiz",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <div className="flex flex-col gap-16 md:gap-24">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="animate-in text-3xl font-bold tracking-tight">
              Projects
            </h1>
            <p
              className="text-secondary animate-in"
              style={{ "--index": 1 } as React.CSSProperties}
            >
              Here are some of the projects I&apos;ve worked on.
            </p>
          </div>
        </div>
        <ul
          className="animate-in flex flex-col gap-8 animated-list"
          style={{ "--index": 3 } as React.CSSProperties}
        >
          {projects.map((project, i) => (
            <li
              key={project.slug}
              className={clsx(
                "flex gap-6",
                // i % 4 === 0 || i % 4 === 3 ? "md:col-span-3" : "md:col-span-2"
              )}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="w-2/5 aspect-video bg-secondary rounded-lg border border-secondary overflow-clip"
              >
                <Halo strength={resolvedTheme === "light" ? 15 : 8}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full "
                  />
                </Halo>
              </Link>
              <div className="w-3/5 space-y-1">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-primary font-medium hover:underline"
                >
                  {project.title}
                </Link>
                <p className="line-clamp-2 text-secondary">
                  {project.description}
                </p>
                <p className="text-secondary">{project.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = allProjects.map((project) =>
    pick(project, ["slug", "title", "time", "description", "image"])
  );

  return {
    props: { projects },
  };
};