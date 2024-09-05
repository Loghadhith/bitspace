"use client";

import { ImportantStar } from "@/assets";
import { Loading } from "@/components";
import { IconBrandGithubFilled, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitterFilled } from "@tabler/icons-react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type eventType = {
	name: string,
	tag: string,
	till: {
		date: string,
		month: string,
		year: string,
	},
	when: {
		date: string,
		month: string,
		year: string,
	}
}


export default function Events() {
	const router = useRouter();
	const [events, setEvents] = useState<Array<eventType> | null>(null);
	useEffect(() => {
		const GET = async () => {
			const { data } = await axios.get("/api/events/meta");
			console.log(Object.values(data));
			setEvents(Object.values(data));
		};
		GET();
	}, [])
	if (!events) return <Loading />
	return (
		<main className="min-h-screen w-full bg-cream flex flex-col items-center justify-center ">
			<section className="w-full lg:w-[900px] h-full pt-24 py-0">
				<h1 className="font-migha text-9xl lg:text-[300px] leading-none text-center lg:text-left">EVENTS</h1>

				<div className="flex flex-col px-10 gap-y-10 justify-items-center bg-black py-10">
					{events?.map((event, index) => (
						<div onClick={() => router.push("/events/" + event.name)} key={index} className="relative h-full w-full min-h-[500px] bg-cream self-end p-4 py-8 flex flex-col justify-between cursor-pointer">
							<div>
								{event.till.year == event.when.year &&
									event.till.month == event.when.month &&
									event.till.date == event.when.date
									? null :
									<div className="-right-16 -top-16 absolute">
										<Image src={ImportantStar} alt="" height={150} width={150} className="rotate-star" />
										<h1 className="text-5xl text-cream absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"> !!! </h1>
									</div>
								}
								<h1 className="font-migha text-8xl">{event.name}</h1>
								<p className="uppercase font-jet-uh text-3xl leading-none">
									{event.tag}
								</p>
							</div>
							<div>
								<div className="flex flex-row">
									<h1 className="text-9xl font-migha text-black leading-none">
										{event.when.date}
									</h1>
									{event.till.year == event.when.year &&
										event.till.month == event.when.month &&
										event.till.date == event.when.date
										? null :
										<h1 className="text-9xl font-migha text-black leading-none">
											-{event.till.date}
										</h1>
									}
								</div>
								<h1 className="text-md font-jet-uh leading-none uppercase w-full inline-flex  justify-between">
									<span>{event.when.month}</span> <span>{event.when.year}</span>
								</h1>
							</div>
						</div>
					))}
				</div>
			</section>


			<section className="w-full lg:w-[900px] mt-1 h-5 bg-black flex items-center justify-between text-cream px-4 text-xs uppercase font-jet-uh">
				<div className="flex space-x-3">
					<Link href="https://github.com/bitspaceorg"><IconBrandGithubFilled size={12} /></Link>
					<Link href="https://twitter.com/bitspaceorg"><IconBrandTwitterFilled size={12} /></Link>
					<Link href="https://www.linkedin.com/company/91385462"><IconBrandLinkedin size={12} /></Link>
					<Link href="https://www.instagram.com/bitspaceorg"><IconBrandInstagram size={12} /></Link>
				</div>
				<h1>2024 &copy; BITSPACE</h1>
			</section>

		</main>
	);
}
