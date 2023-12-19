import { DatePicker, Form, Input, Select, Button, message } from "antd";
import { useEffect } from "react";
import { db } from "../services/fireBaseConnection";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export default function FormDisabledDemo() {
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const fillForm = () => {
    form.setFieldsValue({
      status: "Pendente",
    });
  };

  useEffect(() => {
    fillForm();
  }, []);

  const novaTarefa = async (values) => {
    try {
      const docRef = await addDoc(collection(db, "tarefas"), {
        nome: values.nome,
        descricao: values.descricao,
        status: values.status,
      });
      form.resetFields();
      fillForm();
      success(docRef);
    } catch (err) {
      error();
      console.log(err);
    }
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: `Tarefa adicionada com sucesso!`,
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Erro ao adicionar tarefa!",
    });
  };

  const mensagem = "Preencha o campo";
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {contextHolder}
      <h1 className="text-white text-2xl font-medium"> Nova tarefa </h1>
      <div className="bg-gray-500 p-3 rounded w-2/6 font-medium text-lg">
        <Form form={form} layout="horizontal" onFinish={novaTarefa}>
          <Form.Item
            label="Tarefa"
            name="nome"
            rules={[{ required: true, message: mensagem }]}
            className="w-full flex flex-col gap-2"
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Descrição"
            name="descricao"
            rules={[{ required: true, message: mensagem }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select>
              <Select.Option value="Pendente">Pendente</Select.Option>
              <Select.Option value="Em andamento">Em andamento</Select.Option>
              <Select.Option value="Concluído">Concluído</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              className="bg-indigo-700 hover:bg-indigo-600"
              type="primary"
              htmlType="submit"
            >
              Adicionar tarefa
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
