import fs from "fs";
import path from "path";
import data from "../../data.json";

const filePath = path.resolve(__dirname, "../../../../data.json")

export async function POST(req: Request) {
    try {
        const json = await req.json();

        const _data = [
            ...(data as Array<any>),
            json
        ]

        fs.writeFileSync(path.resolve(filePath), JSON.stringify(_data, null, 2));

        return new Response('done', {
            headers: { "content-type": "application/json" },
            status: 200,
        });
    } catch (e: any) {
        return new Response(e.message || e.toString(), {
            status: 500,
        });
    }
}

