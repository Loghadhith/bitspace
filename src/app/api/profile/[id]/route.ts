import { PARSE } from "@/libs/utils";
import { NextRequest, NextResponse } from 'next/server'

export const revalidate = 1;
export async function GET(_: NextRequest, { params }: { params: { id: string } },
) {
	const { id } = params;
	const res = await fetch(`https://github.com/bitspaceorg/data-vault/blob/main/team/${id}/info.json`, {
		headers: {
			Accept: "application/json",
		},
	});
	const json = await res.json();
	console.log(PARSE(json.payload.blob.rawLines));
	return NextResponse.
		json(PARSE(json.payload.blob.rawLines));
}
