import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const TestimonialsColumn = ({
    className,
    testimonials,
    duration = 10
}) => {
    return (
        <div className={className}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6"
            >
                {[...new Array(2)].map((_, index) => (
                    <React.Fragment key={index}>
                        {testimonials.map(({ text, image, name, role }, i) => (
                            <div className="p-6 rounded-3xl border border-neutral-800 bg-neutral-900/50 shadow-sm max-w-xs w-full" key={i}>
                                <div className="text-neutral-300 text-sm">{text}</div>
                                <div className="flex items-center gap-3 mt-4">
                                    <img
                                        width={40}
                                        height={40}
                                        src={image}
                                        alt={name}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <div className="font-medium text-white text-sm tracking-tight leading-5">{name}</div>
                                        <div className="leading-5 text-neutral-500 text-xs tracking-tight">{role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </motion.div>
        </div>
    );
};
