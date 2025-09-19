import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const HeroScreenshot = ({ imgPath, legend = "" }: { imgPath: string, legend?: string }) => {
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <Card className="p-0">
        <CardContent className="p-0 shadow-lg">
          <div className="w-full overflow-hidden rounded-lg">
            <Image
              src={imgPath}
              alt="Hero Screenshot"
              width={1000}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <p className="text-center mt-4 text-lg">
        {legend}
      </p>
    </div>
  );
};

export { HeroScreenshot };