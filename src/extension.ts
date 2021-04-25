import * as vscode from "vscode";
const fs = require("fs");
const path = require("path");

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, "dingtalk-generator" is now active!');

  const componentGenerator = vscode.commands.registerCommand(
    "extension.createFunctionalComponent",
    (param) => {
      const axmlComponent = fs.readFileSync(
        path.resolve(__dirname, "../src/template-component/temp.axml"),
        "utf8"
      );

      const acssComponent = fs.readFileSync(
        path.resolve(__dirname, "../src/template-component/temp.acssComponent"),
        "utf8"
      );

      const jsComponent = fs.readFileSync(
        path.resolve(__dirname, "../src/template-component/temp.jsComponent"),
        "utf8"
      );

      const jsonComponent = fs.readFileSync(
        path.resolve(__dirname, "../src/template-component/temp.jsonComponent"),
        "utf8"
      );

      // 文件夹绝对路径
      const { fsPath } = param;

      const options = {
        prompt: "请输入组件名: ",
        placeHolder: "组件名",
      };

      const generateComponent = ({
        componentName,
        fsPath,
      }: {
        componentName: string;
        fsPath: string;
      }) => {
        fs.mkdir(`${fsPath}/${componentName}`, { recursive: true }, (err) => {
          if (err) {
            console.log("创建 Error:", err);
            return;
          }
        });

        [
          { data: axmlComponent, type: "axml" },
          { data: acssComponent, type: "acss" },
          { data: jsComponent, type: "js" },
          { data: jsonComponent, type: "json" },
        ].forEach((item) => {
          fs.writeFile(
            `${fsPath}/${componentName}/${componentName}.${item.type}`,
            item.data,
            "utf8",
            (err) => {
              if (err) {
                console.log(`写入${componentName}.${item.type} Error:`, err);
              }
            }
          );
        });
      };

      // 调出系统输入框获取组件名
      vscode.window.showInputBox(options).then((value) => {
        if (!value) return;

        const componentName = value;

        // 生成模板代码
        generateComponent({ componentName, fsPath });
      });
    }
  );

  const pageGenerator = vscode.commands.registerCommand(
    "extension.createPage",
    (param) => {
      const axmlPage = fs.readFileSync(
        path.resolve(__dirname, "../src/template-page/temp.axml"),
        "utf8"
      );

      const acssPage = fs.readFileSync(
        path.resolve(__dirname, "../src/template-page/temp.acss"),
        "utf8"
      );

      const jsPage = fs.readFileSync(
        path.resolve(__dirname, "../src/template-page/temp.js"),
        "utf8"
      );

      const jsonPage = fs.readFileSync(
        path.resolve(__dirname, "../src/template-page/temp.json"),
        "utf8"
      );

      // 文件夹绝对路径
      const { fsPath } = param;

      const options = {
        prompt: "请输入页面名: ",
        placeHolder: "页面名",
      };

      const generateComponent = ({
        componentName,
        fsPath,
      }: {
        componentName: string;
        fsPath: string;
      }) => {
        fs.mkdir(`${fsPath}/${componentName}`, { recursive: true }, (err) => {
          if (err) {
            console.log("创建 Error:", err);
            return;
          }
        });

        [
          { data: axmlPage, type: "axml" },
          { data: acssPage, type: "acss" },
          { data: jsPage, type: "js" },
          { data: jsonPage, type: "json" },
        ].forEach((item) => {
          fs.writeFile(
            `${fsPath}/${componentName}/${componentName}.${item.type}`,
            item.data,
            "utf8",
            (err) => {
              if (err) {
                console.log(`写入${componentName}.${item.type} Error:`, err);
              }
            }
          );
        });
      };

      // 调出系统输入框获取组件名
      vscode.window.showInputBox(options).then((value) => {
        if (!value) return;

        const componentName = value;

        // 生成模板代码
        generateComponent({ componentName, fsPath });
      });
    }
  );

  context.subscriptions.push(componentGenerator, pageGenerator);
}
