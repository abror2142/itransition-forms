import { motion } from "framer-motion";
import cloud from "../../assets/cloud.png";
import { FormMetaData } from "../../schemas/FormMetaDataZod";

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
            href={`/tag/${tag.id}`}
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
      className="flex flex-col gap-4 justify-end bg-contain bg-center bg-no-repeat pt-10 h-[250px]"
      style={{ backgroundImage: `url(${cloud})` }}
    >
      <div className="flex flex-col gap-4 mx-auto mb-8">
        {makeTagButon(tags.slice(0, 3))}
        {makeTagButon(tags.slice(3, 7))}
        {makeTagButon(tags.slice(7, 12))}
      </div>
    </div>
  );
};

export default TagCloud;
