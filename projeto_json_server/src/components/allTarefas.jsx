import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/fireBaseConnection";
import { Table, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";

export default function AllTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    axios.get("http://localhost:3000/tarefas").then((data) => {
      setTarefas(data.data);
    });
  }, []);

  const success = () => {
    messageApi.open({
      type: "success",
      content: `Tarefa excluída com sucesso!`,
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Erro ao excluir tarefa!",
    });
  };

  const showPromiseConfirm = (id) => {
    Modal.confirm({
      title: "Tem certeza?",
      icon: <ExclamationCircleOutlined />,
      content: "Você tem certeza que quer deletar este item?",
      okButtonProps: { danger: true },
      onOk() {
        const handleDelete = async () => {
          try {
            console.log(id);
            axios.delete(`http://localhost:3000/tarefas/${id}`).then(
              (data) => {
                axios.get("http://localhost:3000/tarefas").then((data) => {
                  setTarefas(data.data);
                });
                success();
                console.log(data);
              },
              (error) => {
                error();
                console.log(error);
              }
            );
          } catch (err) {
            console.log(err);
          }
        };
        handleDelete();
      },
      onCancel() {},
    });
  };

  const tableColumns = [
    {
      title: "Tarefa",
      dataIndex: "nome",
      key: "tarefa",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Operação",
      dataIndex: "code",
      key: "operacao",
      render: (_, record) => (
        <span className="flex gap-3 items-center justify-center">
          <a
            className="bg-rose-700 p-2 rounded hover:bg-rose-500 hover:text-black font-medium  "
            onClick={() => showPromiseConfirm(record.id)}
          >
            Apagar
          </a>
          <a
            className="bg-emerald-600 p-2 rounded hover:bg-emerald-300 hover:text-black font-medium"
            href={`/tarefas/edit/${record.id}`}
          >
            Editar
          </a>
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {contextHolder}
      <h1 className=" text-2xl font-medium"> Tarefas cadastradas </h1>
      <Table
        locale={{ emptyText: "Você não tem tarefas registradas" }}
        style={{}}
        dataSource={tarefas}
        columns={tableColumns}
      />
    </div>
  );
}
