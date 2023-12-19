import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../services/fireBaseConnection";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Form, Input, Select, message, DatePicker, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

export default function EditTarefa() {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  useEffect(() => {
    axios.get(`http://localhost:3000/tarefas/${id}`).then(
      (data) => {
        fillForm(data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [id]);

  const fillForm = (tarefaData) => {
    form.setFieldsValue({
      status: tarefaData.status,
      nome: tarefaData.nome,
      descricao: tarefaData.descricao,
    });
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: `Tarefa editada com sucesso!`,
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Erro ao editar tarefa!",
    });
  };

  const editarTarefa = async (values) => {
    try {
      axios.put(`http://localhost:3000/tarefas/${id}`, {
        nome: values.nome,
        descricao: values.descricao,
        status: values.status,
      });
      success();
      setTimeout(() => {
        window.location.href = "/tarefas";
      }, 700);
    } catch (err) {
      error();
      console.log(err);
    }
  };

  const showPromiseConfirm = () => {
    Modal.confirm({
      title: "Tem certeza?",
      icon: <ExclamationCircleOutlined />,
      content: "Você tem certeza que quer deletar este item?",
      okButtonProps: { danger: true },
      onOk() {
        const handleDelete = async () => {
          try {
            await deleteDoc(doc(db, "tarefas", id));
            axios.delete(`http://localhost:3000/tarefas/${id}`).then(
              (data) => {
                sucess();
              },
              (error) => {
                error();
                console.log(error);
              }
            );
            setTimeout(() => {
              window.location.href = "/tarefas";
            }, 700);
          } catch (error) {
            console.log(error);
          }
        };
        handleDelete();
      },
      onCancel() {},
    });
  };

  const mensagem = "Preencha o campo";
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-white text-4xl">Editar Tarefa</h1>
      <div className="flex flex-col items-center justify-center">
        {contextHolder}
        <div className="bg-slate-400 p-5">
          <Form form={form} layout="horizontal" onFinish={editarTarefa}>
            <Form.Item
              label="Tarefa"
              name="nome"
              rules={[{ required: true, message: mensagem }]}
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

            <Form.Item className="flex justify-end">
              <button
                className="bg-green-500 p-2 rounded hover:bg-green-600 hover:scale-95 text-white"
                type="submit"
              >
                Editar tarefa
              </button>
            </Form.Item>
          </Form>
          <div className="flex items-center justify-start gap-3">
            <button
              className="bg-red-500 p-2 rounded hover:bg-red-600 hover:scale-95 text-white"
              onClick={() => {
                showPromiseConfirm();
              }}
            >
              Apagar tarefa
            </button>
            <button
              className="bg-yellow-400 p-2 rounded hover:bg-yellow-600 hover:scale-95 text-white"
              onClick={() => {
                window.location.href = "/tarefas";
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
