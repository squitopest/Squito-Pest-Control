import fs from "fs";
import path from "path";

const map = {
  "IMG_4399.JPG": "team/technician-branded.jpg",
  "IMG_4398.JPG": "team/yard-treatment-wide.jpg",
  "IMG_4402.JPG": "team/eave-treatment.jpg",
  "IMG_4394.JPG": "team/perimeter-door-treatment.jpg",
  "IMG_4347.JPG": "team/cobweb-eave-brush.jpg",
  "IMG_4400.JPG": "team/lawn-perimeter-spray.jpg",
  "IMG_7372.PNG": "company/truck-street.png",
  "IMG_7374.PNG": "company/truck-driveway-equipment.png",
  "IMG_7371.PNG": "team/technician-thumbs-up.png",
  "IMG_7369.PNG": "team/backyard-tree-fogging.png",
  "IMG_7373.PNG": "team/backyard-bush-treatment.png",
  "IMG_7370.PNG": "team/eave-reach-treatment.png",
  "IMG_7375.PNG": "team/stone-wall-treatment.png",
  "IMG_4212.PNG": "team/community-event.png",
  "IMG_3989.png": "team/team-portrait-1.png",
  "IMG_4014.PNG": "team/team-portrait-2.png",
  "IMG_4132.PNG": "team/team-portrait-3.png",
};

fs.mkdirSync("public/team", { recursive: true });
fs.mkdirSync("public/company", { recursive: true });

for (const [src, dst] of Object.entries(map)) {
  if (!fs.existsSync(src)) {
    console.warn("missing", src);
    continue;
  }
  const out = path.join("public", dst);
  fs.copyFileSync(src, out);
  console.log("copied", src, "->", out);
}
