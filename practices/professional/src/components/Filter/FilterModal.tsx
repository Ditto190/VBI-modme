import { Form, Modal, Radio, Select, type RadioChangeEvent } from 'antd'
import type { FormInstance } from 'antd'
import type { FilterField } from './filterTypes'
import { defaultOperatorForRole, operatorsForRole } from './filterOperators'
import { emptyRangeValue } from './filterValue'
import { RangeEditor, ValueEditor } from './FilterEditors'
import type { MessageKey } from 'src/i18n/utils'

export type FilterModalProps = {
  activeFields: string[]
  displayFields: FilterField[]
  editingIndex: number | null
  form: FormInstance
  isZh: boolean
  open: boolean
  operator?: string
  role: FilterField['role']
  selectedField?: string
  t: (key: MessageKey) => string
  onCancel: () => void
  onSubmit: () => void
}

export const FilterModal = (props: FilterModalProps) => (
  <Modal
    title={props.editingIndex !== null ? props.t('filtersEdit') : props.t('filtersAdd')}
    open={props.open}
    onOk={props.onSubmit}
    onCancel={props.onCancel}
    okText={props.isZh ? '保存' : 'Save'}
    cancelText={props.isZh ? '取消' : 'Cancel'}
    destroyOnHidden
  >
    <Form form={props.form} layout='vertical' initialValues={{ operator: 'in', role: 'dimension' }}>
      <Form.Item label={props.t('filtersRole')} name='role'>
        <Radio.Group
          optionType='button'
          onChange={(event: RadioChangeEvent) => setRole(props.form, event.target.value)}
        >
          <Radio value='dimension'>{props.t('filtersDimension')}</Radio>
          <Radio value='measure'>{props.t('filtersMeasure')}</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label={props.t('filtersField')} name='field' rules={[{ required: true }]}>
        <Select
          placeholder={props.isZh ? '选择要筛选的字段' : 'Choose a field'}
          showSearch
          options={props.displayFields.map((field) => ({
            label: (
              <span className={props.activeFields.includes(field.name) ? 'pro-filter-field-active' : ''}>
                {field.name} {props.activeFields.includes(field.name) ? (props.isZh ? '(推荐)' : '(Recommended)') : ''}
              </span>
            ),
            value: field.name,
          }))}
        />
      </Form.Item>
      <Form.Item label={props.t('filtersOperator')} name='operator' rules={[{ required: true }]}>
        {props.role === 'dimension' ? (
          <Radio.Group
            optionType='button'
            onChange={(event: RadioChangeEvent) => setOperator(props.form, event.target.value)}
          >
            {operatorsForRole(props.role, props.isZh).map((op) => (
              <Radio key={op.value} value={op.value}>
                {op.label}
              </Radio>
            ))}
          </Radio.Group>
        ) : (
          <Select
            options={operatorsForRole(props.role, props.isZh)}
            onChange={(value: string) => setOperator(props.form, value)}
          />
        )}
      </Form.Item>
      {props.operator === 'between' ? (
        <RangeEditor field={props.selectedField} isZh={props.isZh} />
      ) : (
        <ValueEditor {...props} />
      )}
    </Form>
  </Modal>
)

const setRole = (form: FormInstance, role: FilterField['role']) => {
  form.setFieldsValue({ field: undefined, operator: defaultOperatorForRole(role), value: undefined })
}

const setOperator = (form: FormInstance, operator: string) => {
  form.setFieldsValue({ value: operator === 'between' ? emptyRangeValue() : undefined })
}
