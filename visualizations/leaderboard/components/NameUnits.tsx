import React from "react";

export const NameUnits: React.FC<{
  name: string;
  full_name?: string;
  link: string;
  name_extra_data: string;
}> = ({ name, full_name, link, name_extra_data }) => {
  const isValidLink = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <>
      <div>
        <strong
          className="name"
          data-full-name={full_name ?? name}
          onClick={() => {
            if (link && isValidLink(link)) {
              window.open(link, "_blank");
            }
          }}
          style={{ cursor: link && isValidLink(link) ? "pointer" : "default" }}
        >
          {name}
        </strong>
      </div>
      <div className="name-extra-data">{name_extra_data}</div>
    </>
  );
};
