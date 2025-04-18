"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { getImage } from "@/server-api/gallery";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [routes, setRoutes] = useState<string[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const pathRoutes = pathname.split("/");

    if (pathname.startsWith("/gallery/") && pathRoutes.length > 3) {
      const fetchImageTitle = async () => {
        const imageId = pathRoutes[pathRoutes.length - 1];
        const image = await getImage(imageId);
        pathRoutes[pathRoutes.length - 1] = image?.title ?? "image";
        setRoutes(pathRoutes);
      };

      fetchImageTitle();
    } else {
      setRoutes(pathRoutes);
    }
  }, [pathname]);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={"/"}>home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {routes.slice(1).map((route, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {index === routes.length - 2 ? (
                  <span>{route}</span>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={`/${routes.slice(1, index + 2).join("/")}`}>
                      {route}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <Separator className="my-4" />
      {children}
    </>
  );
}
