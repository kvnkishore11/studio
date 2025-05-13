"use client";

import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function UnderConstructionView() {
  return (
    <Alert className="m-4">
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        This feature is currently under construction. Please check back later.
      </AlertDescription>
    </Alert>
  );
} 