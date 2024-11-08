import React from "react";
import { Card, CardBody, HeadingText } from "nr1";

export const EmptyState: React.FC = () => (
  <Card className="EmptyState">
    <CardBody className="EmptyState-cardBody">
      <HeadingText
        spacingType={[HeadingText.SPACING_TYPE.LARGE]}
        type={HeadingText.TYPE.HEADING_3}
      >
        No data available.
      </HeadingText>
      <p>
        Please refer to the{" "}
        <a
          href="https://github.com/newrelic-experimental/nr1-viz-leaderboard"
          target="_blank"
          rel="noopener noreferrer"
          className="repo-link"
        >
          GitHub repository
        </a>{" "}
        for setup instructions and more information.
      </p>
    </CardBody>
  </Card>
);
