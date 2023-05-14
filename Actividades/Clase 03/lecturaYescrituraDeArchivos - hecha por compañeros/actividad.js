const fs = require("fs");

async function readInfoFromPackageAndGenerateInfoJsonFile() {
    let packageJson = await fs.promises.readFile("package.json", "utf-8");
    packageJson = JSON.parse(packageJson);

    let info = packageJson.info;
    console.log(info);
    await fs.promises.writeFile("info.json", JSON.stringify(info));
}

readInfoFromPackageAndGenerateInfoJsonFile();
