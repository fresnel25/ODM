export const mapToOptions = (data, labelKey = "name") =>
  data.map((item) => ({
    value: String(item.id),
    label: item[labelKey],
  }));
