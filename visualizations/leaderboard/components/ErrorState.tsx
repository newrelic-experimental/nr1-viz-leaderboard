import React from "react";
import { Card, CardBody, HeadingText } from "nr1";

type ErrorStateProps = {
  errorMessage: string;
};

export const ErrorState: React.FC<ErrorStateProps> = ({ errorMessage }) => (
  <Card className="ErrorState">
    <CardBody className="ErrorState-cardBody">
      <HeadingText
        spacingType={[HeadingText.SPACING_TYPE.LARGE]}
        type={HeadingText.TYPE.HEADING_3}
      >
        An error occurred.
      </HeadingText>
      <div className="ErrorState-cardSection">
        <p className="ErrorState-errorText">{errorMessage}</p>
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
      </div>
    </CardBody>
  </Card>
);
