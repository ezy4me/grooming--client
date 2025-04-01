import React, { useState } from "react";
import styles from "./Services.module.css";
import { useGetCategoriesQuery } from "../../../../../services/categoryService";
import { useGetServicesByCategoryQuery } from "../../../../../services/serviceService";

const Spinner = () => <div className={styles.spinner}></div>;

const Services: React.FC = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const { data: services, isLoading: isServicesLoading } =
    useGetServicesByCategoryQuery(selectedCategoryId!, {
      skip: selectedCategoryId === null,
    });

  const handleOpenModal = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const handleCloseModal = () => {
    setSelectedCategoryId(null);
  };

  return (
    <section id="services" className={styles.services}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Наши Услуги</h2>
        <div className={styles.divider}></div>

        {isLoading || error ? (
          <div className={styles.loadingContainer}>
            {isLoading ? (
              <Spinner />
            ) : (
              <p className={styles.error}>Ошибка при загрузке категорий</p>
            )}
          </div>
        ) : (
          <div className={styles.grid}>
            {categories?.map((category) => (
              <div
                key={category.id}
                className={styles.card}
                onClick={() => handleOpenModal(category.id)}
              >
                <div className={styles.icon}>{category.name[0]}</div>
                <h3 className={styles.cardTitle}>{category.name}</h3>
                <p className={styles.cardText}>{category.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedCategoryId !== null && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              ✖
            </button>
            <h2 className={styles.modalTitle}>Услуги категории</h2>
            <div className={styles.divider}></div>
            <div className={styles.modalContent}>
              {isServicesLoading ? (
                <Spinner />
              ) : (
                <ul className={styles.serviceList}>
                  {services?.length ? (
                    services.map((service) => (
                      <li key={service.id} className={styles.serviceItem}>
                        <h3>{service.name}</h3>
                        <p>{service.description}</p>
                        <span className={styles.servicePrice}>
                          {service.price}₽
                        </span>
                      </li>
                    ))
                  ) : (
                    <p className={styles.noServices}>Услуг пока нет</p>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
