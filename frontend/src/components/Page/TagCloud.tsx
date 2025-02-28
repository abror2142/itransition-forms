import { motion } from "framer-motion";
import { FormMetaData } from "../../schemas/FormMetaDataZod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

const generateRandomPosition = () => ({
  x: Math.random() * 20 - 10,
  y: Math.random() * 20 - 10,
});

const TagCloud = ({ tags }: { tags: FormMetaData["tags"] }) => {

  const makeTagButon = (tagsSlice: FormMetaData["tags"]) => {
    return (
      <div className="flex flex-wrap gap-4 mx-auto">
        {tagsSlice.map((tag, index) => (
          <motion.a
            href={`/search?tag=${tag.name}`}
            key={"tag-cloud-item-" + index}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 transition"
            animate={{
              x: [0, generateRandomPosition().x, 0],
              y: [0, generateRandomPosition().y, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2, // Random duration for variety
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            {tag.name}
          </motion.a>
        ))}
      </div>
    );
  };

  return (
    <div
      className="max-w-3xl dark:bg-dark-card-light px-6 py-4 rounded-md dark:border dark:border-dark-border mx-auto flex flex-col gap-4 bg-white"
    >
      <p className="text-2xl flex gap-2 items-center">Tags<FontAwesomeIcon icon={faHashtag} /></p>
      <div className="flex flex-col gap-4 mx-auto">
        {makeTagButon(tags)}
      </div>
    </div>
  );
};

export default TagCloud;
