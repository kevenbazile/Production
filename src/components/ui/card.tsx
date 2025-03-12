// components/ui/card.tsx
"use client";
import { FC } from "react"

export const Card: FC<any> = ({ children, className }) => {
  return <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
}

export const CardHeader: FC<any> = ({ children, className }) => {
  return <div className={`border-b p-4 ${className}`}>{children}</div>
}

export const CardContent: FC<any> = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>
}

export const CardFooter: FC<any> = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>
}

export const CardTitle: FC<any> = ({ children, className }) => {
  return <h3 className={`text-lg font-medium ${className}`}>{children}</h3>
}

export const CardDescription: FC<any> = ({ children, className }) => {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
}