"use client";

import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";

interface TabItem {
    value: string;
    label: string;
    content: React.ReactNode;
}

interface SectionTabsProps {
    defaultValue: string;
    tabs: TabItem[];
}

export default function SectionTabs({
    defaultValue,
    tabs,
}: SectionTabsProps) {
    return (
        <Tabs defaultValue={defaultValue} className="w-full gap-0">
            <TabsList className="h-auto w-full max-w-xl justify-start rounded-none border-b bg-transparent p-0">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="
                                rounded-none
                                border-b-2 border-transparent
                                bg-transparent
                                px-4 py-3
                                text-base font-medium text-slate-500

                                hover:text-[#155DFC]

                                data-[active]:text-[#155DFC]
                                data-[active]:border-[#155DFC]
                                data-[active]:bg-transparent
                                data-[active]:shadow-none
                            ">
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            <div className="border-b w-full"></div>

            {tabs.map((tab) => (
                <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className="mt-6"
                >
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    );
}