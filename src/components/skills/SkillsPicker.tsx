import { Field, FieldProps } from "formik";
import ReactSelect from "react-select";
import { Box, Button, Flex, FormControl, FormLabel } from "@chakra-ui/react";
import useStore from "../../stores/useStore";
import { useEffect, useState } from "react";
import AddSkillForm from "./AddSkillForm";
import { SkillTypes } from "service/skill/SkillTypes";
import _ from "lodash";
import { observer } from "mobx-react";

type SkillsPickerProps = {
  name: string;
};

const SkillsPicker = observer(({ name }: SkillsPickerProps) => {
  const [isSkillFormOpen, setIsSkillFormOpen] = useState(false);
  const store = useStore();
  const options = store.skills.map((skill) => ({
    value: skill,
    label: skill.name
  }));

  const onSkillFormClose = () => {
    store.fetchSkills();
    setIsSkillFormOpen(false);
  };

  const findSelectedValue: (values: SkillTypes.Skill[]) => {
    value: SkillTypes.Skill;
    label: string;
  }[] = (values) => {
    const selectedValues: { value: SkillTypes.Skill; label: string }[] = [];
    if (_.isArray(values)) {
      values.forEach((val) => {
        const obj = options.find((op) => {
          return op.value.id === val.id;
        });
        if (obj) {
          selectedValues.push(obj);
        }
      });
    }

    return selectedValues;
  };

  useEffect(() => {
    store.fetchSkills();
  }, []);

  return (
    <>
      {isSkillFormOpen && <AddSkillForm isOpen={isSkillFormOpen} onClose={onSkillFormClose} />}
      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <FormControl>
            <FormLabel>Skills</FormLabel>
            <Flex>
              <Box flex={"70%"} mr={4}>
                <ReactSelect
                  {...field}
                  // styles={{
                  //   multiValue: (base) => ({
                  //     ...base,
                  //     backgroundColor: "green.500"
                  //   }),
                  //   option: (base, state) => ({
                  //     ...base,
                  //     backgroundColor: state.isSelected ? "green.500" : "blue.500",
                  //     color: state.isSelected ? "white" : "black"
                  //   })
                  // }}
                  onChange={(values) => {
                    form.setFieldValue(
                      name,
                      values.map((val) => val.value)
                    );
                  }}
                  value={findSelectedValue(field.value)}
                  isMulti
                  options={options}
                  isClearable
                  classNamePrefix="react-select"
                  placeholder="Skills IDs"
                />
              </Box>
              <Box>
                <Button onClick={() => setIsSkillFormOpen(true)}>Add</Button>
              </Box>
            </Flex>
          </FormControl>
        )}
      </Field>
    </>
  );
});

export default SkillsPicker;
